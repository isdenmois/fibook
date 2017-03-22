import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import InlineSVG from 'svg-inline-react';

import {
    selectLoading,
} from '../../selectors/main';
import { selectNewBooks, selectReadBooks } from '../../selectors/entities';
import Loading from '../../components/Loading';
import { createNewBook } from '../../actions/details';
import FileInput from '../../components/FileInput';
import ListTab from '../../components/ListTab';
import Page from '../../components/Page';
import fileUpload from './file_upload.svg';
import css from './HomePage.css';

export class HomePage extends Component {
    constructor(props) {
        super(props);
        this.renderFixed = this.renderFixed.bind(this);
        this.changeIndex = this.changeIndex.bind(this);

        this.state = { index: 0 };
    }

    getTabs() {
        return [
            {
                label: 'Новые',
                icon: 'ion-ios-book',
            },
            {
                label: 'Прочтенные',
                icon: 'md-library',
            },
        ];

        //
        // return [
        //     {
        //         content: (
        //             <Page
        //                 key="new-page-content"
        //                 renderFixed={this.renderFixed}
        //             >
        //                 <ListTab
        //                     key="new-page-content-list"
        //                     data={newBooks}
        //                 />
        //             </Page>
        //         ),
        //         tab: (
        //             <Tab
        //                 key="new-page-tab"
        //                 label="Новые"
        //                 icon="ion-ios-book"
        //             />
        //         ),
        //     },
        //     {
        //         content: (
        //             <Page key="read-page-content">
        //                 <ListTab
        //                     key="read-page-content-list"
        //                     data={readBooks}
        //                 />
        //             </Page>
        //         ),
        //         tab: (
        //             <Tab
        //                 key="read-page-tab"
        //                 label="Прочтенные"
        //                 icon="md-library"
        //             />
        //         ),
        //     },
        // ];
    }


    changeIndex(event) {
        this.setState({
            index: event.index,
        });
    }

    renderFixed() {
        const { createNewBook: fileSelect } = this.props;

        return (
            <FileInput onFileSelect={fileSelect}>
                <InlineSVG
                    className={css.icon}
                    src={fileUpload}
                />
            </FileInput>
        );
    }

    render() {
        const { loading } = this.props;
        const index = this.state.index;

        if (loading) {
            return <Loading />;
        }

        if (!loading) {
            return (
                <Page
                    tabs={this.getTabs()}
                    fixed={this.renderFixed()}
                >
                    <ListTab
                        data={this.props.newBooks}
                    />
                </Page>
            );
        }

        return <div>{index}</div>;

        // return (
        //     <div>
        //         <Tabbar
        //             index={index}
        //             onPreChange={this.changeIndex}
        //             renderTabs={this.renderTabs}
        //             position={ons.platform.isAndroid() ? 'top' : null}
        //         />
        //     </div>
        // );
    }
}

HomePage.propTypes = {
    createNewBook: PropTypes.func.isRequired,
    newBooks: PropTypes.array,
    // readBooks: PropTypes.array,
    loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
    newBooks: selectNewBooks,
    readBooks: selectReadBooks,
    loading: selectLoading,
});

const mapActionsToProps = {
    createNewBook,
};

export default connect(mapStateToProps, mapActionsToProps)(HomePage);
