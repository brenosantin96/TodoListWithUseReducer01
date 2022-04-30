import React, { useState, useReducer, ChangeEvent } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid'

//Criando a tipagem do que um Todo tem. no caso tem um id, nome e done para verificar se está pronto
type todoType = {
    id: number;
    name: string;
    done?: boolean
}

//criando tipagem do actionType a ser usado no useReducer, o payload não é obrigatório.
type actionType = {
    type: string;
    payload?: {
        id?: number,
        name?: string,
        done?: boolean
    }

}

//criando o estado inicial, colocando o estado inicial sendo um array de Todos, um array que vai comecar vazio;
const initialToDos: todoType[] = [];

//criando a funcao reducer que vai ser disparada pelo dispatch, cada action promove uma acao diferente.
function reducer(stateTodos: todoType[], actionType: actionType) {

    switch (actionType.type) {
        case 'ADD-TODO':
            if (actionType.payload?.id && actionType.payload?.name) {
                let newStateTodos = [...stateTodos];
                newStateTodos.push({
                    id: actionType.payload?.id,
                    name: actionType.payload?.name,
                    done: actionType.payload?.done
                })
                console.log("Adicionado TODO");
                return newStateTodos;
                break;

            }

        case 'DEL-TODO':
            if (actionType.payload?.id) {
                let newStateTodos = [...stateTodos];
                newStateTodos = newStateTodos.filter((item) => item.id !== actionType.payload?.id)
                console.log("Deletado TODO");
                return newStateTodos;
                break;

            }

        case 'TOGGLE-TODO':
            if (actionType.payload?.id) {
                let newStateTodos = [...stateTodos];

                for (let item of newStateTodos) {
                    if (item.id === actionType.payload?.id) {
                        item.done = !item.done
                    }
                }

                console.log(newStateTodos);
                return newStateTodos;
            }

        default:
            return stateTodos;

    }

}


//Aqui de fato chamando o componente para ser disponibilziado na tela.
function App2() {

    const [inputTodo, setInputTodo] = useState('');
    const [stateTodos, dispatch] = useReducer(reducer, initialToDos);


    //controlando o input para sempre que digittar atualizar o valor do proprio.
    const handleInputTodo = (e: ChangeEvent<HTMLInputElement>) => {
        setInputTodo(e.target.value);
    }

    //Funcao que faz acao de adicionar Todo ao dar submit no FORM
    const handleForm = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch({
            type: 'ADD-TODO', payload: {
                id: parseInt(uuidv4()),
                name: inputTodo,
                done: false
            }
        });

        setInputTodo('');

    }

    //Funcao que faz acao de deletar TODO ao clicar no botao de delete
    const handleDelTodo = (id: number) => {
        dispatch({
            type: 'DEL-TODO', payload: {
                id: id
            }
        });


    }

    //Funcao que chama o Toggle-TODO, chama a action Toggle TODO e altera o status DONE para FALSE (nao esta funcionando ainda)
    const handleToggleTodo = (id: number) => {
        dispatch({
            type: 'TOGGLE-TODO', payload: {
                id
            }
        })
    }


    return (
        <div>
            <form action="submit" onSubmit={handleForm}>
                <input type="text" value={inputTodo} onChange={handleInputTodo} />
                <button type='submit'>ENVIAR</button>
            </form>

            <div>
                LISTA:
                <ul>
                    {stateTodos.map((item) => {
                        return (
                            <li key={item.id}>
                                {item.id} - {item.name}
                                <button onClick={() => handleDelTodo(item.id)}> DELETAR </button>
                                <button onClick={() => handleToggleTodo(item.id)}>CHECK</button>
                            </li>
                        )
                    })}
                </ul>
            </div>




        </div>
    )
}

export default App2
