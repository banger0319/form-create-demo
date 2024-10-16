import { ref, Ref } from 'vue'

export type Condition =
  | '='
  | '!='
  | '<>'
  | '>'
  | '>='
  | '<'
  | '<='
  | 'in'
  | 'notIn'
  | 'on'
  | 'notOn'
  | 'between'
  | 'notBetween'
  | 'empty'
  | 'notEmpty';
export type Method = 'display' | 'disabled' | 'hidden' | 'required' | 'include';
export interface FormControl {
  id: string;
  value: string | number;
  method: Method;
  condition: Condition;
}
interface FormOption {
  id: string;
  label: string;
  pid: string | null;
  show: boolean;
}
export interface FormItem {
  id: string;
  title: string;
  type: 'select' | 'input' | 'checkbox' | 'radio' | 'textarea';
  option: Array<FormOption> | null;
  control: Array<FormControl> | null;
  value: any;
}

export const formOptions: Ref<Array<FormItem>> = ref([
  {
    id: '1',
    title: '性别',
    type: 'select',
    value: '',
    option: [
      { id: '1', label: '男', pid: null, show: true },
      { id: '2', label: '女', pid: null, show: true }
    ],
    control: [
      {
        id: '2',
        value: 1,
        method: 'include',
        condition: '='
      },
      {
        id: '2',
        value: '1',
        method: 'required',
        condition: '='
      }
    ]
  },
  {
    id: '2',
    title: '爱好',
    type: 'select',
    value: '',
    option: [
      { id: '1', label: '打球', pid: '1', show: true },
      { id: '2', label: '跳舞', pid: '2', show: true }
    ],
    control: []
  }
])
