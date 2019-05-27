import * as React from 'react'
import InlineSVG from 'components/InlineSvg'

import {container} from 'utils/container'
import HomePageContainer, {ContainerProps} from '../containers/HomePageContainer'
import ListTab from 'components/ListTab'

import Loading from 'components/Loading'
import FileInput from 'components/FileInput'
import Tabs from 'components/Tabs'

const fileUpload = require('./icons/file_upload.svg')
const bookIcon = require('./icons/ios-book.svg')
const bookIconOutline = require('./icons/ios-book-outline.svg')
const flagIcon = require('./icons/ios-flag.svg')
const flagIconOutline = require('./icons/ios-flag-outline.svg')
const s = require('./style/homePage.css')


@container(HomePageContainer)
export class HomePage extends React.Component<ContainerProps> {

  render() {
    if (this.props.fetching) {
      return <Loading />
    }

    return (
      <>
        <Tabs name="home" data={this.getData()}/>
        {this.props.children}
      </>
    )
  }

  getData() {
    return [
      {
        title: 'Новые',
        content: (
          <ListTab
            data={this.props.news}
            loadingMore={this.props.newsLoadingMore}
            canLoadMore={this.props.newsCanLoadMore}
            onLoadMore={this.handleNewsLoadMore}
          />
        ),
        fixed: this.renderFixed(),
        icon: bookIcon,
        activeIcon: bookIconOutline,
      },
      {
        title: 'Прочтенные',
        content: (
          <ListTab
            data={this.props.read}
            loadingMore={this.props.readLoadingMore}
            canLoadMore={this.props.readCanLoadMore}
            onLoadMore={this.handleReadLoadMore}
          />
        ),
        fixed: this.renderFixed(),
        icon: flagIcon,
        activeIcon: flagIconOutline,
      },
    ]
  }

  renderFixed() {
    return (
      <FileInput name="book-upload" onFileSelect={this.props.onCreateBook}>
        <InlineSVG
          className={s.icon}
          src={fileUpload}
        />
      </FileInput>
    )
  }

  private handleNewsLoadMore = () => {
    this.props.onLoadMore('news')
  }

  private handleReadLoadMore = () => {
    this.props.onLoadMore('read')
  }
}
