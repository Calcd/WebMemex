import React, { PropTypes } from 'react'
import classNames from 'classnames'

import styles from './VisitAsListItem.css'

import {localVersionAvailable, LinkToLocalVersion} from 'src/page-viewer'

const VisitAsListItem = ({doc, compact}) => {
    const visitClasses = classNames({
        [styles.root]: true,
        [styles.compact]: compact,
    })

    return (
        <a
            className={visitClasses}
            href={doc.page.url}
            title={doc.page.url}
            // DEBUG Show document props on ctrl+meta+click
            onClick={e => { if (e.metaKey && e.ctrlKey) { console.log(doc); e.preventDefault() } }}
        >

            {doc.page.screenshot
                ? <img className={styles.thumbnail} src={doc.page.screenshot} />
                : null
            }

            <div className={styles.caption}>
                <span className={styles.title} title={doc.page.title}>
                    {doc.page.favIcon
                        ? <img className={styles.favicon} src={doc.page.favIcon} />
                        : null
                    }
                    {doc.page.title}
                </span>
                {localVersionAvailable({page: doc.page})
                    ? <LinkToLocalVersion className={styles.linkToLocalVersion} page={doc.page}>💾</LinkToLocalVersion>
                    : null
                }
            </div>
        </a>
    )
}

VisitAsListItem.propTypes = {
    doc: PropTypes.object.isRequired,
    compact: PropTypes.bool,
}

export default VisitAsListItem
