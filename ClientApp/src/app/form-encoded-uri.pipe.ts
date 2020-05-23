import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'formEncodedUri'
})
export class FormEncodedUriPipe implements PipeTransform {
  transform(uriComponents: string[]): string {
    return '/' + uriComponents.map(uriComponent => encodeURI(uriComponent)).join('/');
  }
}
