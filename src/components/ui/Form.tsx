/**
 * Form Component
 * --------------
 * A wrapper around <form> with consistent layout and optional error/message blocks.
 *
 * Props:
 * - onSubmit: function - form submit handler
 * - children: React.ReactNode
 * - error?: string - optional error message
 * - message?: string - optional success/info message
 * - disabled?: boolean - disables inputs/buttons inside form
 *
 * Example usage:
 * <Form onSubmit={handleSubmit} error="Invalid email">
 *   <Input ... />
 * </Form>
 */

import Alert from './Alert';

export default function Form({
  onSubmit,
  children,
  error,
  message,
  disabled = false,
}: {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  children: React.ReactNode;
  error?: string;
  message?: string;
  disabled?: boolean;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      {message && <Alert type="success" message={message} />}
      {error && <Alert type="error" message={error} />}
      <fieldset disabled={disabled} className="space-y-4">
        {children}
      </fieldset>
    </form>
  );
}
