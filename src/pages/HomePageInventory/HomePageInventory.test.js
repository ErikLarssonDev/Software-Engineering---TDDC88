import { render, screen } from '@testing-library/react'
import { BrowserRouter as Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil';
import React from 'react'
import HomePageInventory from './HomePageInventory';

test('Scan for withdrawl button in homepage for inventory personel', () => {
    render(<Route><React.StrictMode><RecoilRoot><HomePageInventory /></RecoilRoot></React.StrictMode></Route>)
    const theButton = screen.getByRole('button', {
        name: /Skanna för uttag/i});
    expect(theButton).toBeDefined();
})

test('Search article button in homepage for inventory personel', () => {
    render(<Route><React.StrictMode><RecoilRoot><HomePageInventory /></RecoilRoot></React.StrictMode></Route>)
    const theButton = screen.getByRole('button', {
        name: /Sök artikel/i});
    expect(theButton).toBeDefined();
})

test('Order button in homepage for inventory personel', () => {
    render(<Route><React.StrictMode><RecoilRoot><HomePageInventory /></RecoilRoot></React.StrictMode></Route>)
    const theButton = screen.getByRole('button', {
        name: /Beställningar/i});
    expect(theButton).toBeDefined();
})

test('Handle inventory button in homepage for inventory personel', () => {
    render(<Route><React.StrictMode><RecoilRoot><HomePageInventory /></RecoilRoot></React.StrictMode></Route>)
    const theButton = screen.getByRole('button', {
        name: /Hantera Lager/i});
    expect(theButton).toBeDefined();
})
