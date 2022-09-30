import { useState, useEffect, useRef, useCallback } from "react"
import { useSSRFetcher } from "../../contexts/ssrFetcher"
import css from "./moveToFolderMenu.module.scss"
import SelectMoveFolder from "./selectFolder"

export default function MoveToFolderMenu({ visible, onMoved, isText, itemId }) {
    const ssrFetcher = useSSRFetcher()

    const searchDebounceTimeoutRef = useRef(-1)

    const [folders, setFolders] = useState([])
    const [search, setSearch] = useState("")

    const fetchFolders = useCallback(async () => {
        const rawResponse = await fetch(`/api/folders/search?${new URLSearchParams({ search }).toString()}`, {
            "headers": {
                "content-type": "application/json"
            },
            "method": "GET"
        });
        const response = await rawResponse.json()

        if (response.error == null) {
            setFolders(response.folders)
        }
    }, [search])

    useEffect(() => {
        if (visible) fetchFolders()
    }, [visible, fetchFolders])

    useEffect(() => {
        if (!visible) return

        clearTimeout(searchDebounceTimeoutRef.current)
        searchDebounceTimeoutRef.current = setTimeout(fetchFolders, 300)
    }, [visible, search, fetchFolders])

    useEffect(() => {
        return () => {
            clearTimeout(searchDebounceTimeoutRef.current)
        }
    }, [])

    const handleFolderSelect = async (folderId) => {
        const url = isText ? "/api/texts/move" : "/api/folders/move"

        const rawResponse = await fetch(url, {
            "headers": {
                "content-type": "application/json"
            },
            "body": JSON.stringify({
                itemId,
                newParentId: folderId
            }),
            "method": "POST"
        });
        const response = await rawResponse.json()

        if (response.error == null) {
            onMoved()

            if (isText) {
                ssrFetcher.setProps(oldState => {
                    return {
                        ...oldState,
                        texts: response.newTexts
                    }
                })
            } else {
                ssrFetcher.setProps(oldState => {
                    return {
                        ...oldState,
                        folders: response.newFolders
                    }
                })
            }
        }
    }

    const renderFolders = folders.map(folder => {
        if (!isText && itemId == folder.id) return null

        return <SelectMoveFolder key={folder.id} onClick={handleFolderSelect} folder={folder} />
    })

    return (
        <div className={css.container} data-visible={visible}>
            <div>move to new folder</div>
            <div>
                <input placeholder="search" onChange={e => setSearch(e.target.value)} />
            </div>
            <div>
                <SelectMoveFolder onClick={handleFolderSelect} folder={{ id: null, title: "root" }} />
                {renderFolders}
            </div>
        </div>
    )
}