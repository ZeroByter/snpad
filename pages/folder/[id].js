import { useSSRFetcher } from "../../components/contexts/ssrFetcher"
import Header from "../../components/index/header"
import LoggedIn from "../../components/index/loggedIn"
import { getLoginSession } from "../../serverlib/auth"
import FoldersSQL from "../../serverlib/sql-classes/folders"
import TextsSQL from "../../serverlib/sql-classes/texts"
import UsersSQL from "../../serverlib/sql-classes/users"

export async function getServerSideProps(context) {
	const session = await getLoginSession(context.req)

	let username = null
	let texts = null
	let folders = null

    let parentFolderId = null

	if(session?.id != null){
		const account = await UsersSQL.getById(session.id)
		username = account.username

		texts = await TextsSQL.getAllInParent(session.id, context.query.id)
		folders = await FoldersSQL.getAllInParent(session.id, context.query.id)

        parentFolderId = (await FoldersSQL.getById(context.query.id)).folderid
	}

	return {
		props: {
			username,
			folders,
			texts,
            parentFolderId
		}
	}
}

export default function IndexPage() {
	const ssrFetcher = useSSRFetcher()
	const { username, texts, folders, parentFolderId } = ssrFetcher.props

	let contents
	if(username != null){
		contents = <LoggedIn texts={texts} isRootFolder={false} folders={folders} parentFolderId={parentFolderId} />
	}

	return (
		<>
			<Header username={username} />
			{contents}
		</>
	)
}
