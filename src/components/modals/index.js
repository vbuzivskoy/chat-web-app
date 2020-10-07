import AddChannelModal from './AddChannelModal';
import EditChannelModal from './EditChannelModal';
import RemoveChannelModal from './RemoveChannelModal';

const mapModalTypeToComponent = {
  adding: AddChannelModal,
  editing: EditChannelModal,
  removing: RemoveChannelModal,
};

export default (type) => mapModalTypeToComponent[type];
