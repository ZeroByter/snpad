import { FC, useCallback, useEffect, useRef, useState } from "react";
import css from "./menu.module.scss";
import Container from "../container";
import Input from "../input";
import MoveFolderFolder from "./folder";
import { ClientSearchedFolder } from "@/clientlib/types/searchedFolder";
import { useSSRFetcher } from "@/components/contexts/ssrFetcher";

type Props = {
  itemId: string;
  parentId: string;
  isText: boolean;
  onMoved: () => void;
};

const MoveFolderMenu: FC<Props> = ({ itemId, parentId, isText, onMoved }) => {
  const ssrFetcher = useSSRFetcher();

  const searchDebounceTimeoutRef = useRef(-1);

  const [search, setSearch] = useState("");
  const [folders, setFolders] = useState<ClientSearchedFolder[]>([]);

  const fetchFolders = useCallback(async () => {
    const rawResponse = await fetch(
      `/api/folders/search?${new URLSearchParams({
        search,
        itemId,
        parentId,
      }).toString()}`,
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
  }, [search, itemId, parentId]);

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

  const handleFolderSelect = async (folderId: string) => {
    const url = isText ? "/api/texts/move" : "/api/folders/move";

    const rawResponse = await fetch(url, {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        itemId,
        newParentId: folderId,
      }),
      method: "POST",
    });
    const response = await rawResponse.json();

    if (response.error == null) {
      onMoved();

      if (isText) {
        ssrFetcher.setProps((oldState) => {
          return {
            ...oldState,
            texts: response.newTexts,
          };
        });
      } else {
        ssrFetcher.setProps((oldState) => {
          return {
            ...oldState,
            folders: response.newFolders,
          };
        });
      }
    }
  };

  const renderFolders = folders.map((folder) => {
    return (
      <MoveFolderFolder
        key={folder.id}
        folder={folder}
        onClick={handleFolderSelect}
      />
    );
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
