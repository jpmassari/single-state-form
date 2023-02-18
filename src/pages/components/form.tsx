import { useState } from 'react';

import { trpc, RouterOutputs, RouterInputs } from "../../utils/trpc";

type Robot = {
  name: string,
  type: string
}
type Task = {
  name: string,
  description: string
}
type Api  = {
    id: number,
    code: string,
    url: string
}

interface FormData {
  robot: Robot
  task: Task
  api: Api
  [key: string]: Robot | Task | Api;
}

const FormInput: React.FC = () => {

  const [formData, setFormData] = useState<{[key: string]: any}>({
    robot: {
      name: '',
      type: '',
    },
    task: {
      name: '',
      description: ''
    },
    api: {
      id: 0,
      code: '',
      url: ''
    }
  });
 
/*   const [selectedApi, setSelectedApi] = useState<Api | null>(null); */

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target; //const name = event.target.name as string; const value = event.target.value as string;
    const category = event.target.id;
    const Category: keyof FormData = category as string;
    setFormData({ ...formData, [Category]: { ...formData[Category], [name]: value }});
  };

  const { data: apiList }: {data: RouterOutputs['api']['getAll'] | undefined} = trpc.api.getAll.useQuery();
  const { mutate: insertRobot } = trpc.insert.insertRobot.useMutation()
 
  if (!apiList) return <div>Loading...</div>
  
  return (
    <form
       onSubmit={(event) => {
          event.preventDefault();
          console.log(event.preventDefault());
          insertRobot({robot: formData.robot, tasks: [formData.task], api: formData.api.id});
        }
      }
    >
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="robot-name">
          Robo:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="robot"
          type="text"
          name="name"
          onChange={handleChange}
          value={formData.robot.name || ''}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="robot-type">
          Robo tipo:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="robot"
          type="text"
          name="type"
          onChange={handleChange}
          value={formData.robot.type || ''}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="task-name">
          Nome da tarefa
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="task"
          type="text"
          name="name"
          onChange={handleChange}
          value={formData.task.name || ''}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="task-description">
          Descrição da tarefa
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="task"
          type="text"
          name="description"
          onChange={handleChange}
          value={formData.task.description || ''}
        />
      </div>
      <div className="mb-6">
        <label htmlFor="api-select">Select an API:</label>
        <select
          id="api"
          name="api"
          value={formData.api.url}
          onChange={(event) => {
            const selectedCode = event.target.value;
            const selectedApi = apiList.find((api) => api.code === selectedCode);
            if (selectedApi) {
              setFormData({...formData, api: selectedApi});
            } 
          }}
          //onChange={handleChange}
        >
          <option value="" disabled>
            Select an API
          </option>
          {apiList.map((api) => (
            <option key={api.code} value={api.code}>
              {api.code} - {api.url}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Criar
        </button>
      </div>
    </form>
  );
};

export default FormInput;