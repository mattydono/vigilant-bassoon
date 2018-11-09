import { configure } from 'enzyme';
import EnzymeAdapterReact16 from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';

configure({ adapter: new EnzymeAdapterReact16() });
expect.addSnapshotSerializer(createSerializer() as any);
