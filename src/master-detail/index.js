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
  @observable selectedEntity;
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
    const Detail = (this.selectedEntity) ?
      this.props.UpdateDetail : this.props.CreateDetail;
    const entityName = this.props.entityName;
    const detailTitle = (this.selectedEntity) ?
      `Edit ${entityName}` : `Create ${entityName}`;
    const activityText = (this.contentState === UNCHANGED) ? <span/> :
      <Paper className={style.activityText} rounded={ false } zDepth={1}>
        Entity saved
      </Paper>;

    return (
      <div className={style.container}>
        <div className={style.master}>
          <FloatingActionButton className={style.createButton}
            onClick={(e) => {this.selectedEntity = undefined}}>
            <ContentAdd/>
          </FloatingActionButton>
          <Master onSelectionChange={cId => {this.selectedEntity = cId}}/>
        </div>
        <div className={style.detail}>
          <h2>{detailTitle}</h2>
          {activityText}
          <Detail id={this.selectedEntity}
            onSave={() => {this.contentState = SAVED}}/>
        </div>
      </div>
    );
  }
}

export default MasterDetail;
