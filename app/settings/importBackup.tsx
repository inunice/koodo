"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

import useImportBackup from "./hooks/useImportBackup";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  DATABASE_NAME,
  USER_BOOKMARKS_TABLE,
  USER_BOOKMARKS_SCHEMA,
} from "@/config/localDatabase";

const fileSchema = z.object({
  formatName: z.string(),
  formatVersion: z.number(),
  data: z.object({
    databaseName: z.literal(DATABASE_NAME),
    databaseVersion: z.number(),
    tables: z.array(
      z.object({
        name: z.literal(USER_BOOKMARKS_TABLE),
        schema: z.literal(USER_BOOKMARKS_SCHEMA),
        rowCount: z.number(),
      })
    ),
    data: z.array(
      z.object({
        tableName: z.literal(USER_BOOKMARKS_TABLE),
        inbound: z.boolean(),
        rows: z.array(z.record(z.any())),
      })
    ),
  }),
});

const formSchema = z.object({
  file: z.instanceof(FileList).optional(),
});

export default function ImportBackup() {
  const { importBackup, isLoading } = useImportBackup();
  const [file, setFile] = useState<File | null>(null);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const validateFileContent = (fileContent: string) => {
    try {
      const json = JSON.parse(fileContent);
      const parsed = fileSchema.safeParse(json);

      if (!parsed.success) {
        const errorMessages = parsed.error.errors.map((error) => {
          return `Validation error at ${error.path.join(" > ")}: ${
            error.message
          }`;
        });
        console.log(errorMessages);

        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description:
            "Your backup file is invalid, please ensure the file is correct. If you need help, please contact support!",
        });

        return false;
      }

      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Your file is invalid, please ensure it is a JSON file!",
      });
      return false;
    }
  };

  const handleFileRead = async (file: File, fileContent: string) => {
    if (validateFileContent(fileContent)) {
      const success = await importBackup(file);
      if (success) {
        toast({
          title: "Yay!",
          description: "Import successful!",
        });
      } else {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "Please contact support!",
        });
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target?.result as string;
        handleFileRead(file, fileContent);
      };
      reader.readAsText(file);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="file"
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="file"
                  placeholder="Select backup file"
                  onChange={handleFileChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!file || isLoading}>
          {isLoading ? "Importing..." : "Import Backup"}
        </Button>
      </form>
    </Form>
  );
}
