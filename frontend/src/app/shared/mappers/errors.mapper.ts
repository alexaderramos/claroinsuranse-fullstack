import {HttpErrorResponse} from "@angular/common/http";

export function mapError(error: HttpErrorResponse): string[] {


  if (error.status === 500) {
    return ['Error interno del servidor'];
  }

  if (error.status === 422) {
    if (error.error.errors) {
      return Object.keys(error.error.errors).map((key) => error.error.errors[key]);
    }
  }

  return [];
}


