import React from 'react';

// CSS
import './FileUploader.scss';

const FileUploader = React.memo((props) => {
	return <div className="file-uploader__btn"> <i className="fas fa-plus" /> </div>;
});

export default FileUploader;