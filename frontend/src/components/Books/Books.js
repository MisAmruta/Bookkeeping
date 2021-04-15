import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookAction } from '../../redux/actions/books/bookActions';
import Loading from '../Loading/Loading';

const Books = ()=>{
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchBookAction())
    },[dispatch])

    const {books, loading } = useSelector(state=>{
        return state.booksList;
    })

  //   console.log(books);
  // console.log(loading);

  return(
      <div>
          <div className='row'>
              <div className='col'>
              <table className='table table-hover'>
              <thead>
              <tr>
                <th scope='col'>Author</th>
                <th scope='col'>Book Name</th>
                <th scope='col'>Action</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>
            <tbody>
                { loading ? (
                    <Loading />
                ) : (
                    <>
                    {
                        books && books.map(book=>{
                            return(
                                <>
                                <tr className='table-dark'>
                            <th scope='row'>{book.title}</th>
                            <td>{book.author}</td>
                            <td>
                              <i
                                className='fas fa-trash '
                                style={{
                                  color: 'red',
                                  cursor: 'progress',
                                }}></i>
                            </td>
                            <td>
                              <i
                                className='far fa-edit'
                                style={{
                                  color: 'yellow',
                                  cursor: 'progress',
                                }}></i>
                            </td>
                          </tr>
                                </>
                            )
                        })
                    }
                    </>
                )

                }
            </tbody> 
            </table>
              </div>
          </div>
      </div>
  )

}

export default Books