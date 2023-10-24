import { render, screen } from '@testing-library/react'
import SearchArticlePage from './SearchArticlePage'
// import SearchArticle from '../../components/SearchArticle';
import { BrowserRouter as Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil';
import React from 'react'
import userEvent from '@testing-library/user-event';

test('Input box visible', () => {
    render(<Route><React.StrictMode><RecoilRoot><SearchArticlePage /></RecoilRoot></React.StrictMode></Route>)
    const inputBox = screen.getByRole('textbox', {
        name: /Sök efter artikel/i});
    expect(inputBox).toBeDefined();
})

test('Input box writable', () => {
    render(<Route><React.StrictMode><RecoilRoot><SearchArticlePage /></RecoilRoot></React.StrictMode></Route>)
    const inputBox = screen.getByRole('textbox', {
        name: /Sök efter artikel/i});
    userEvent.type(inputBox, "Testing");
    expect(inputBox.value).toBe("Testing");
})

test('Choose inventory button visible', () => {
    /*
    render(<Route><React.StrictMode><RecoilRoot><SearchArticlePage /></RecoilRoot></React.StrictMode></Route>)
    const inputBox = screen.getByRole('button', {
        name: /Välj lager/i});
    expect(inputBox).toBeDefined();
    */
})

