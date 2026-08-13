import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, test, expect, vi, beforeAll, afterAll } from 'vitest'
import ErrorBoundary from './ErrorBoundary'

const ThrowErrorComponent = () => {
    throw new Error('Test Error')
}

describe('ErrorBoundary', () => {
    let consoleSpy

    beforeAll(() => {
        // Prevent console.error output cluttering the test logs
        consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    })

    afterAll(() => {
        consoleSpy.mockRestore()
    })

    test('renders children normally when no error is thrown', () => {
        render(
            <ErrorBoundary>
                <div data-testid="child">Safe Content</div>
            </ErrorBoundary>
        )
        expect(screen.getByTestId('child')).toHaveTextContent('Safe Content')
    })

    test('renders custom fallback when an error is thrown', () => {
        render(
            <ErrorBoundary fallback={<div>Custom Error UI</div>}>
                <ThrowErrorComponent />
            </ErrorBoundary>
        )
        expect(screen.getByText('Custom Error UI')).toBeInTheDocument()
    })

    test('renders default fallback when an error is thrown and no custom fallback is provided', () => {
        render(
            <ErrorBoundary>
                <ThrowErrorComponent />
            </ErrorBoundary>
        )
        expect(screen.getByText('Unable to load 3D content')).toBeInTheDocument()
    })
})
