import { render, screen } from '@testing-library/react'
import HomePage from './HomePage'
import { BrowserRouter as Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil';
import React from 'react'

test('Scan article button in homepage', () => {
    render(<Route><React.StrictMode><RecoilRoot><HomePage /></RecoilRoot></React.StrictMode></Route>)
    const theButton = screen.getByRole('button', {
        name: /Skanna artikel/i});
    expect(theButton).toBeDefined();
})

test('Search article button in homepage', () => {
    render(<Route><React.StrictMode><RecoilRoot><HomePage /></RecoilRoot></React.StrictMode></Route>)
    const theButton = screen.getByRole('button', {
        name: /Sök artikel/i});
    expect(theButton).toBeDefined();
})



