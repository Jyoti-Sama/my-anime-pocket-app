import { View } from "react-native-web";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Provider } from 'react-redux'

import NavBar from "./components/common/NavBar";
import Home from "./components/pages/Home";
import MyList from "./components/pages/MyList";
import Search from "./components/pages/Search";
import User from "./components/pages/User";

import { store } from './redux/Store';

export default function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>

        <NavBar />

        <View style={{ paddingBottom: 40 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="list" element={<MyList />} />
            <Route path="user" element={<User />} />
          </Routes>
        </View>
      </BrowserRouter>
    </Provider>
  );
}


