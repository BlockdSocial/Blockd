// Libraries
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import { deleteCookie } from 'cookies-next';

/**
 *
 */
export function triggerMissingFieldAlert(title: any, text: any) {
  if (Swal.isVisible()) return;

  Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: false,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Ok',
  });
}

/**
 *
 */
export async function triggerUnauthorizedUserAlert() {
  await new Promise((f) => setTimeout(f, 1000));
  toast.error('Unauthorized');
}

/**
 *
 */
export function triggerSuccessAlert(title: string, text: string) {
  Swal.fire({
    title,
    text,
    icon: 'success',
    confirmButtonColor: '#5CB85C',
    confirmButtonText: 'Ok',
  });
}

/**
 *
 */
export function triggerFailAlert(title: string, text: string) {
  Swal.fire({
    title,
    text,
    icon: 'error',
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Ok',
  });
}

/**
 *
 */
export async function triggerAreYouSureAlert(title = 'Are you sure?', text = '') {
  const { value } = await Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    cancelButtonColor: '#ddd',
    confirmButtonText: 'Yes',
  });

  return value;
}

/**
 *
 */
export async function triggerApiConflictAlert(title: string, text = '') {
  const { value } = await Swal.fire({
    title,
    text,
    icon: 'error',
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Ok',
  });

  return value;
}

