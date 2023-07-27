import App from "./App"
import{render,screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";

test('on initial, button is disabled',async ()=>{
    render(<App/>)
    expect(await screen.findByRole('button', { name: /Жми../i })).toBeDisabled()
})

test('if text is entered',async ()=>{
    render(<App/>)
    userEvent.type(screen.getByPlaceholderText(/name/i),'555777777')
    expect(await screen.findByRole('button', { name: /Жми../i })).toBeEnabled()
})