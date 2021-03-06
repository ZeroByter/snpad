import Header from "../components/index/header";
import LoggedIn from "../components/index/loggedIn";
import { getLoginSession } from "../serverlib/auth";
import TextsSQL from "../serverlib/sql-classes/texts";
import UsersSQL from "../serverlib/sql-classes/users";

export async function getServerSideProps(context) {
	const session = await getLoginSession(context.req)

	let username = null
	let texts = null

	if(session?.id != null){
		const account = await UsersSQL.getById(session.id)
		username = account.username

		texts = await TextsSQL.getAllByUserId(session.id)
	}

	return {
		props: {
			username,
			texts
		}
	}
}

export default function IndexPage({ username, texts }) {
	let contents
	if(username != null){
		contents = <LoggedIn texts={texts} />
	}

	return (
		<div>
			<Header username={username} />
			{contents}
		</div>
	)
}
