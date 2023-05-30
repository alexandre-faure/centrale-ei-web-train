import './Users.css';
import { useEffect, useState } from 'react';
import axios from "axios";
import ButtonChoice from '../../components/ButtonChoice/ButtonChoice';
import InputProfile from '../../components/InputProfile/InputProfile';
import Checkbox from '../../components/Checkbox/Checkbox';

function Users() {
  const [genres, setGenres] = useState([]);
  const [username, setUsername] = useState("username");
  const [disabledUsername, setDisabledUsername] = useState(true);
  const [firstname, setFirstname] = useState("First Name");
  const [disabledFirstname, setDisabledFirstname] = useState(true);
  const [lastname, setLastname] = useState("Last Name");
  const [disabledLastname, setDisabledLastname] = useState(true);
  const [checkedGenres, setCheckedGenres] = useState([]);
  const [checkboxChecked, setCheckboxChecked] = useState([]);

  const loadGenres = () => {
    axios
      .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=522d421671cf75c2cba341597d86403a`)
      .then((response) => {
        // Do something if success
        setGenres(response.data.genres)
      })
      .catch((error) => {
        // Do something if call failed
        console.log(error)
      });
  };

  useEffect(loadGenres, []);

  const handleButtonClick = (buttonId) => {
    if (checkedGenres.includes(buttonId)) {
      setCheckedGenres(checkedGenres.filter((id) => id !== buttonId));
    } else {
      setCheckedGenres([...checkedGenres, buttonId]);
    }
  };

  const handleCheckboxClick = (buttonId) => {
    if (checkboxChecked.includes(buttonId)) {
      setCheckboxChecked(checkboxChecked.filter((id) => id !== buttonId));
    } else {
      setCheckboxChecked([...checkboxChecked, buttonId]);
    }
  };

  return (
    <div className="Users-container">
      <h1><i className="icon-user"></i> My Userpage</h1>
      <div id="profile-container">
        <h2>My profile</h2>
        <table id="profile-infos-container">
          <tbody>
          
            <InputProfile label={"Username"} input={username} setInput={setUsername}
            disabledInput={disabledUsername}  setDisabledInput={setDisabledUsername}/>
            
            <InputProfile label={"First name"} input={firstname} setInput={setFirstname}
            disabledInput={disabledFirstname}  setDisabledInput={setDisabledFirstname} />

            <InputProfile label={"Last name"} input={lastname} setInput={setLastname}
            disabledInput={disabledLastname}  setDisabledInput={setDisabledLastname} />

          </tbody>
        </table>

        <h2>My favorite genres</h2>
        <div id="profile-genres-container">
          {genres.map((genre) => {
            return <ButtonChoice key={genre.id} idGenre={genre.id} label={genre.name}
            checkedGenres={checkedGenres} handleButtonClick={handleButtonClick} />
          })}
        </div>

        <h2>My settings</h2>
        <div id="settings-container">
          <table>
            <tbody>
              <tr>
                <td>
                  <label>I want recommandations :</label>
                </td>
                <td>
                  <Checkbox idCheckbox={1} checkboxChecked={checkboxChecked} handleCheckboxClick={handleCheckboxClick}/>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
