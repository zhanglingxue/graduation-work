import { schema } from 'normalizr';

const listSchema = new schema.Entity('list', {
}, { idAttribute: 'id' });
// const lessonListSchema = new schema.Array(lessonSchema);

// export default {
//   lessonListSchema
// };
export const LIST = [listSchema];