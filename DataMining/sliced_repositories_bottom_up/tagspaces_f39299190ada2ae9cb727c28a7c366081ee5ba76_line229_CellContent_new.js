N
o
 
l
i
n
e
s
N
o
 
l
i
n
e
s
N
o
 
l
i
n
e
s
import i18n from 'i18next';
export default i18n;
import React from 'react';
import formatDistance from 'date-fns/formatDistance';
import removeMd from 'remove-markdown';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/FolderOpen';
import TagContainerDnd from '../../../components/TagContainerDnd';
import TagContainer from '../../../components/TagContainer';
import AppConfig from '../../../config';
import i18n from '../../../services/i18n';
const maxDescriptionPreviewLength = 100;
const CellContent = (props: Props) => {
  const {
    fsEntry,
    entryHeight,
    classes,
    theme,
    supportedFileTypes,
    thumbnailMode,
    addTags,
    selectedEntries,
    isReadOnlyMode,
    handleTagMenu,
    layoutType
  } = props;
  const fsEntryBackgroundColor = fsEntry.color ? fsEntry.color : 'transparent';
  let description = removeMd(fsEntry.description);
  if (description.length > maxDescriptionPreviewLength) {
    description = description.substr(0, maxDescriptionPreviewLength) + '...';
  }
  const fsEntryColor = findColorForFileEntry(
    fsEntry.extension,
    fsEntry.isFile,
    supportedFileTypes
  );
  let thumbPathUrl = fsEntry.thumbPath
    ? 'url("' + fsEntry.thumbPath + '")'
    : '';
  if (AppConfig.isWin) {
    thumbPathUrl = thumbPathUrl.split('\\').join('\\\\');
  }

  function renderTag(tag: Object) {
    return isReadOnlyMode ? (
      <TagContainer
        tag={tag}
        key={tag.id}
        entryPath={fsEntry.path}
        addTags={addTags}
        handleTagMenu={handleTagMenu}
        selectedEntries={selectedEntries}
      />
    ) : (
      <TagContainerDnd
        tag={tag}
        key={tag.id}
        entryPath={fsEntry.path}
        addTags={addTags}
        handleTagMenu={handleTagMenu}
        selectedEntries={selectedEntries}
      />
    );
  }
  if (layoutType === 'grid') {
    return (
      <div style={{
        backgroundColor: fsEntryBackgroundColor
      }}
      >
        <div
          className={classes.gridCellThumb}
          style={{
            backgroundSize: thumbnailMode,
            backgroundImage: thumbPathUrl,
            height: 150 // fsEntry.isFile ? 150 : 70
          }}
        >
          <div id="gridCellTags" className={classes.gridCellTags}>
            {
              fsEntry.tags.map(tag => renderTag(tag))
            }
          </div>
          {description.length > 0 && (
            <Typography
              id="gridCellDescription"
              className={classes.gridCellDescription}
              title={i18n.t('core:filePropertiesDescription')}
              variant="caption"
            >
              {description}
            </Typography>
          )}
        </div>
        <Typography
          className={classes.gridCellTitle}
          data-tid="fsEntryName"
          title={fsEntry.path}
          noWrap={true}
          variant="body1"
        >
          {extractTitle(fsEntry.name, !fsEntry.isFile)}
        </Typography>
        {fsEntry.isFile ? (
          <div className={classes.gridDetails}>
            <Typography
              className={classes.gridFileExtension}
              style={{ backgroundColor: fsEntryColor }}
              noWrap={true}
              variant="button"
              title={fsEntry.path}
            >
              {fsEntry.extension}
            </Typography>
            <Typography className={classes.gridSizeDate} variant="caption">
              <span
                title={
                  i18n.t('core:modifiedDate') +
                  ': ' +
                  formatDateTime(fsEntry.lmdt, true)
                }
              >
                {fsEntry.lmdt && ' ' + formatDistance(fsEntry.lmdt, new Date(), { addSuffix: true }) /* ⏲ */}
              </span>
              <span title={fsEntry.size + ' ' + i18n.t('core:sizeInBytes')}>
                {' ' + formatFileSize(fsEntry.size)}
              </span>
            </Typography>
          </div>
        ) : (
          <div className={classes.gridDetails}>
            <FolderIcon
              className={classes.gridFolder}
              style={{ backgroundColor: fsEntryColor }}
              title={fsEntry.path}
            />
            {/* <Typography className={classes.gridSizeDate} variant="caption">
              {' ' + formatDateTime4Tag(fsEntry.lmdt) }
            </Typography> */

}
          </div>
        )}
      </div>
    );
  }
    return (
        style={{
          backgroundColor: theme.palette.background.default
        }}
          style={{
            minHeight: entryHeight,
            padding: 10,
            marginRight: 5,
            backgroundColor: fsEntryBackgroundColor
          }}
          {fsEntry.isFile ? (
              style={{ backgroundColor: fsEntryColor }}
          ) : (
                style={{ backgroundColor: fsEntryColor }}
          )}
          <Typography style={{ wordBreak: 'break-all' }}>
    );
  }
};
