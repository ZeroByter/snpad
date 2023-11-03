import { FC } from "react";
import ActionMenuItem from "../actionMenu/item";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { ClientFolder } from "@/clientlib/types/folder";
import { useSSRFetcher } from "@/components/contexts/ssrFetcher";

type Props = {
  folder: ClientFolder;
};

const DeleteFolderAction: FC<Props> = ({ folder }) => {
  const ssrFetcher = useSSRFetcher();

  const handleClick = async () => {
    if (
      confirm(
        "Are you sure you want to delete this folder forever?\nAll recursive items in this folder will be destroyed forever!"
      )
    ) {
      const rawResponse = await fetch("/api/folders/delete", {
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id: folder.id,
        }),
        method: "POST",
      });
      const response = await rawResponse.json();

      if (response.error == null) {
        ssrFetcher.setProps((oldState) => {
          return {
            ...oldState,
            folders: oldState.folders.filter(
              (stateFolder) => stateFolder.id != folder.id
            ),
          };
        });
      }
    }
  };

  return (
    <div>
      <ActionMenuItem text="Delete" icon={faTrashCan} onClick={handleClick} />
    </div>
  );
};

export default DeleteFolderAction;
