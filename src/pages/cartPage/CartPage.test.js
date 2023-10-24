import { render, screen } from '@testing-library/react'
import CartPage from './CartPage';
import { BrowserRouter as Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil';
import React from 'react'
import userEvent from '@testing-library/user-event';

test('Checkout button visible', () => {
    render(<Route><React.StrictMode><RecoilRoot><CartPage /></RecoilRoot></React.StrictMode></Route>)
    const checkOutButton = screen.getByText(/Checka ut/i);
    expect(checkOutButton).toBeDefined();
})



