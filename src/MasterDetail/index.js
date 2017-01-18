import React from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Paper from 'material-ui/Paper';
import ContentAdd from 'material-ui/svg-icons/content/add';
import style from './style.css';

const SAVED = 1;
const CHANGED = 2;
const UNCHANGED = 3;

@observer
class MasterDetail extends React.Component {
  @observable selectedContact;
  @observable contentState = UNCHANGED;

  componentWillUpdate() {
    if (this.contentState === SAVED) {
      this.contentState = CHANGED;
    }
    else {
      this.contentState = UNCHANGED;
    }
  }

  render() {
    const Master = this.props.Master;
    const Detail = (this.selectedContact) ?
      this.props.UpdateDetail : this.props.CreateDetail;
    const detailTitle = (this.selectedContact) ?
      'Edit Contact' : 'Create Contact';
    const activityText = (this.contentState === UNCHANGED) ? <span/> :
      <Paper className={style.activityText} rounded={ false } zDepth={1}>
        Entity saved
      </Paper>;

    return (
      <div className={style.container}>
        <div className={style.master}>
          <FloatingActionButton className={style.createContactButton}
            onClick={(e) => {this.selectedContact = undefined}}>
            <ContentAdd/>
          </FloatingActionButton>
          <Master onSelectionChange={cId => {this.selectedContact = cId}}/>
        </div>
        <div className={style.detail}>
          <h2>{detailTitle}</h2>
          {activityText}
          <Detail id={this.selectedContact}
            onSave={() => {this.contentState = SAVED}}/>
        </div>
      </div>
    );
  }
}

export default MasterDetail;
