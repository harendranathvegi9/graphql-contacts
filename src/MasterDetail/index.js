import React from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import style from './style.css';

@observer
class MasterDetail extends React.Component {
  @observable selectedContact;

  // TODO: upgrade 'material-ui' lib once
  // <https://github.com/callemall/material-ui/pull/5884> is merged
  render() {
    const Master = this.props.Master;
    const Detail = (this.selectedContact) ?
      this.props.UpdateDetail : this.props.CreateDetail;
    const detailTitle = (this.selectedContact) ?
      'Edit Contact' : 'Create Contact';

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
          <Detail id={this.selectedContact}/>
        </div>
      </div>
    );
  }
}

export default MasterDetail;
