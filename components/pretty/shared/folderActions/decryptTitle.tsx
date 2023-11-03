import { FC } from "react";
import ActionMenuItem from "../actionMenu/item";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { ClientFolder } from "@/clientlib/types/folder";
import CryptoJS from "crypto-js";

type Props = {
  enable: boolean;
  folder: ClientFolder;
  setDecryptedTitle: (newDecryptedTitle: string) => void;
};

const DecryptTitleAction: FC<Props> = ({
  enable,
  folder,
  setDecryptedTitle,
}) => {
  const handleClick = () => {
    promptTitleDecrypt();
  };

  const promptTitleDecrypt = () => {
    const password = prompt("Title password");
    if (password != null) {
      try {
        const decrypted = CryptoJS.AES.decrypt(folder.title, password).toString(
          CryptoJS.enc.Utf8
        );

        if (
          decrypted.length >= 10 &&
          decrypted.substring(0, 5) == decrypted.substring(decrypted.length - 5)
        ) {
          setDecryptedTitle(decrypted.substring(5, decrypted.length - 5));
        } else {
          promptTitleDecrypt();
        }
      } catch {
        promptTitleDecrypt();
      }
    }
  };

  return (
    <div>
      <ActionMenuItem
        enable={enable}
        text="Decrypt title"
        icon={faFolderOpen}
        onClick={handleClick}
      />
    </div>
  );
};

export default DecryptTitleAction;
