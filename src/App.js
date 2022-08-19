import { useEffect, useState } from "react";
import "./App.css";
import axios from "./Components/axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { storeData } from "./features/todos";

function App() {
  const dispatch = useDispatch();
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const userDetails = useSelector((state) => state.userDetail.value);
  const showUserDetail = (userId, todoId, title) => {
    axios
      .get(`/users/${userId}`)
      .then((res) => {
        console.log(res.data);
        dispatch(
          storeData({
            userId: userId,
            name: res.data.name,
            email: res.data.email,
            todoId: todoId,
            todoTitle: title,
          })
        );
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    axios
      .get("/todos")
      .then((res) => {
        const response = res.data.map((data) => {
          if (data.status === true) {
            return {
              userId: data.userId,
              id: data.id,
              title: data.title,
              status: "Complete",
            };
          } else if (data.status === false) {
            return {
              userId: data.userId,
              id: data.id,
              title: data.title,
              status: "Incomplete",
            };
          } else {
            return {
              userId: data.userId,
              id: data.id,
              title: data.title,
              status: "Incomplete",
            };
          }
        });
        setTodos(response);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="flex ml-10 w-max">
      <div className="flex flex-col">
        <div className="flex mt-10">
          <h1 className="font-bold text-2xl">Todos</h1>
          <div className="ml-auto flex border-2 mb-2 border-black rounded-full mr-2">
            <img src="./SEARCH.svg" alt="" />
            <input
              className="rounded-full mr-2"
              type="text"
              placeholder="Search..."
              onChange={(e) => {
                console.log(searchTerm);
                setSearchTerm(e.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <table className="w-[100%]">
            <thead>
              <tr className="border-2 border-[black]">
                <th>ToDo Id</th>
                <th className="sm:w-[20rem] xl:w-[30rem]">Title</th>
                <th>Title Status</th>
                <th>Action</th>
              </tr>
            </thead>
            {todos
              .filter((data) => {
                if (searchTerm === "") {
                  return data;
                } else if (
                  data.title.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return data;
                } else if (
                  data.status.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return data;
                } else if (data.id.toString().includes(searchTerm)) {
                  return data;
                }
              })
              .map((data, index) => {
                return (
                  <tbody key={index}>
                    <tr className="border-2 border-[black]">
                      <td>{data.id}</td>
                      <td className="sm:w-[20rem] xl:w-[30rem]">
                        {data.title}
                      </td>
                      <td>{data.status}</td>
                      <td>
                        <button
                          onClick={() => {
                            showUserDetail(
                              `${data.userId}`,
                              `${data.id}`,
                              `${data.title}`
                            );
                          }}
                        >
                          View User
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
          </table>
        </div>
        <div></div>
      </div>
      <div className="ml-24 mt-40">
        <h1 className="font-bold text-2xl">User Details</h1>
        <div className="border-2 border-[black] pr-20 p-4 w-max">
          ToDoId: {userDetails.todoId} <br />
          Todo Tile: {userDetails.todoTitle} <br />
          User Id: {userDetails.userId} <br />
          Name: {userDetails.name} <br />
          Email: {userDetails.email} <br />
        </div>
      </div>
    </div>
  );
}

export default App;
