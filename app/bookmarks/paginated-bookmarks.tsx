import { Bookmark } from "@/types/bookmark-types";

import BookmarkCard from "./bookmark-card";

interface PaginatedBookmarksProps {
  paginatedBookmarks: Bookmark[];
  isLoading: boolean;
}

const PaginatedBookmarks: React.FC<PaginatedBookmarksProps> = ({
  paginatedBookmarks,
  isLoading,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 px-3">
      {isLoading ? (
        <p>Loading...</p>
      ) : paginatedBookmarks.length > 0 ? (
        paginatedBookmarks.map((bookmark, index) => (
          <BookmarkCard key={index} bookmark={bookmark} />
        ))
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default PaginatedBookmarks;
