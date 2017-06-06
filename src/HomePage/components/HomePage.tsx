import * as React from 'react'
const InlineSVG = require('svg-inline-react')

import {container} from 'utils/container'
import HomePageContainer, {ContainerProps} from '../containers/HomePageContainer'
import ListTab from 'components/ListTab'

const Loading = require('components/Loading').default
const FileInput = require('components/FileInput').default
const Tabs = require('components/Tabs').default

const fileUpload = require('./icons/file_upload.svg')
const bookIcon = require('./icons/ios-book.svg')
const bookIconOutline = require('./icons/ios-book-outline.svg')
const flagIcon = require('./icons/ios-flag.svg')
const flagIconOutline = require('./icons/ios-flag-outline.svg')
const s = require('./style/homePage.css')


@container(HomePageContainer)
export default class HomePage extends React.Component<ContainerProps, void> {

  render() {
    if (this.props.fetching) {
      return <Loading />
    }

    return (
      <span>
        <Tabs data={this.getData()}/>
        {this.props.children}
      </span>
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
        icon: flagIcon,
        activeIcon: flagIconOutline,
      },
    ]
  }

  renderFixed() {
    return (
      <FileInput onFileSelect={this.props.onCreateBook}>
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
