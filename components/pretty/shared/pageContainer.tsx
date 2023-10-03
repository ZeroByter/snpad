import { FC, ReactElement } from "react";
import css from "./pageContainer.module.scss";
import Header from "../header";
import { useSSRFetcher } from "@/components/contexts/ssrFetcher";

type Props = {
  children: ReactElement;
};

const PageContainer: FC<Props> = ({ children }) => {
  const ssrFetcher = useSSRFetcher();
  const { username }: { username?: string } = ssrFetcher.props;

  return (
    <div className={css.pageRoot}>
      <Header username={username} />
      <div className={css.root}>{children}</div>
    </div>
  );
};

export default PageContainer;
