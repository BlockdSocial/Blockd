// Libraries
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';

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

  const value = await Swal.fire({
    title: 'Session Expired',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    cancelButtonColor: '#ddd',
    confirmButtonText: 'Yes',
  })
    .then((result: any) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        window.location.replace('/');
      }
    });

  return value;
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

