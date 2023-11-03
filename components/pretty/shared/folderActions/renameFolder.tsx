import { FC, SetStateAction } from "react";
import ActionMenuItem from "../actionMenu/item";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import NewFolderModal from "../modals/newFolder";
import useModal from "@/components/contexts/modal";
import { ClientFolder } from "@/clientlib/types/folder";
import { useActionMenu } from "../actionMenu";

type Props = {
  existingFolder: ClientFolder;
  setFolderState: (newFolder: SetStateAction<ClientFolder>) => void;
};

const RenameFolderAction: FC<Props> = ({ existingFolder, setFolderState }) => {
  const { itemClick } = useActionMenu();

  const { visible, toggle } = useModal();

  const handleRename = (finalTitle, titleHint) => {
    itemClick();
    setFolderState((oldFolder) => {
      return {
        ...oldFolder,
        title: finalTitle,
        titleencrypted: !!titleHint,
        titlehint: titleHint,
      };
    });
  };

  return (
    <div>
      <ActionMenuItem text="Rename" icon={faFolderOpen} onClick={toggle} />
      {visible && (
        <NewFolderModal
          onBackdropClick={toggle}
          existingFolder={existingFolder}
          onSuccess={handleRename}
        />
      )}
    </div>
  );
};

export default RenameFolderAction;
