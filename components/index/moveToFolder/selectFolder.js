import css from "./selectFolder.module.scss"

export default function SelectMoveFolder({ onClick, folder }) {
    return (
        <div role="button" className={css.container} onClick={() => onClick(folder.id)}>
            {folder.title}
        </div>
    )
}