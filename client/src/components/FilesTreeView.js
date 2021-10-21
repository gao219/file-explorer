import FileTreeNode from './FileTreeNode';
import css from './FilesTreeView.module.css';

function FilesTreeView({files}) {
  return (
    <div className={css.container}>
      {files.map(file => <FileTreeNode key={file.name} node={file}/>)}
    </div>
  );
}

export default FilesTreeView;