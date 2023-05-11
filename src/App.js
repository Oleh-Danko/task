import { useState, useEffect } from "react";
import { useHttp } from "./hooks/httpHook";

import Employees from "./components/Employees/Employees";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Form from './components/Form/Form'

function App() {
  const {request, isLoading} = useHttp()
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers()
  }, [page])

  const getUsers = () => {
    request(`https://frontend-test-assignment-api.abz.agency/api/v1/users`)
    .then(data => setTotalPages(Math.ceil(data.total_users / 6)))

    request(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`)
    .then(data => setUsers(data.users))
  }

  return (
    <div className="App">
      <Header />
      <Main />
      <Employees
        setPage={setPage}
        page={page}
        users={users}
        isLoading={isLoading}
        totalPages={totalPages}
         />
      <Form getUsers={getUsers} setPage={setPage} />
    </div>
  );
}

export default App;
