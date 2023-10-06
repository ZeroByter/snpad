import { FC, useCallback, useEffect, useRef, useState } from "react";
import css from "./menu.module.scss";
import Container from "../container";
import Input from "../input";
import MoveFolderFolder from "./folder";

const MoveFolderMenu: FC = () => {
  const searchDebounceTimeoutRef = useRef(-1);

  const [search, setSearch] = useState("");
  const [folders, setFolders] = useState([]);

  const fetchFolders = useCallback(async () => {
    const rawResponse = await fetch(
      `/api/folders/search?${new URLSearchParams({ search }).toString()}`,
      {
        headers: {
          "content-type": "application/json",
        },
        method: "GET",
      }
    );
    const response = await rawResponse.json();

    if (response.error == null) {
      setFolders(response.folders);
    }
  }, [search]);

  useEffect(() => {
    clearTimeout(searchDebounceTimeoutRef.current);
    searchDebounceTimeoutRef.current = setTimeout(
      fetchFolders,
      300
    ) as unknown as number;
  }, [search, fetchFolders]);

  useEffect(() => {
    return () => {
      clearTimeout(searchDebounceTimeoutRef.current);
    };
  }, []);

  const renderFolders = folders.map((folder) => {
    return <MoveFolderFolder key={folder.id} />;
  });

  return (
    <Container unclickable className={css.root}>
      <div className={css.header}>Move to folder</div>
      <div className={css.searchContainer}>
        <Input
          className={css.search}
          type="search"
          autoFocus
          placeholder="Search folder"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className={css.folders}>{renderFolders}</div>
    </Container>
  );
};

export default MoveFolderMenu;
