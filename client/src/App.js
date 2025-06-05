import { HashRouter, Routes, Route } from 'react-router-dom';
import CategoryPage from './pages/CategoryPage';
import Header from './components/Header';
import ProductPage from './pages/ProductPage';

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route element={<Header/>}>
                    <Route index element={<CategoryPage/>}/>
                    <Route path="categories/:categoryName" element={<CategoryPage/>}/>
                    <Route path="product/:productId" element={<ProductPage/>}/>
                </Route>
            </Routes>
        </HashRouter>
    );
}

export default App;
