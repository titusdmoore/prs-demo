import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any, args: any, isR?: boolean): any {
    const arrObjects = value;
    const column = args;
    // const order = isR ? -1 : 1;

    return arrObjects.sort((a, b) => {
      let result = 0;
      if (a[column] > b[column]) {
        result = 1;
      } else if (a[column] < b[column]) {
        result = -1;
      }
      // console.log("Hello!");
      // console.log(order);
      // console.log(result);
      return result /* * order*/;
    });
  }
}
