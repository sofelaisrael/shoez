import { GrClose } from "react-icons/gr";
import React, { useEffect } from 'react'

const FilterInput = ({ setArr, data, content, select, name }) => {
    const selectbtn = select
    const cont = content

    useEffect(() => {
        const selects = document.querySelector(`.${selectbtn}`)
        const span = document.querySelector(`.${selectbtn} > span`)
        const def = document.querySelector(`.${selectbtn}+.def`)
        const options = document.querySelector(`.${cont} ul`)
        const contents = document.querySelector(`.${cont}`)
        const inp = document.querySelector(`.${cont} input`)

        def.onclick = () => {
            span.textContent = "Any"
            setArr('Any')
            inp.value = ''
            contents.classList.remove('active')
        }

        selects.onclick = () => {
            options.scrollTo(0, 0)
            inp.focus()
            inp.value = ''
            options.innerHTML = ''
            contents.classList.toggle("active")
            data.map(item => {
                const li = document.createElement('li');
                li.textContent = item;
                li.classList.add('text-[12px]')
                options.appendChild(li);
                li.addEventListener('click', () => {
                    span.textContent = item;
                    setArr(item)
                    contents.classList.remove('active')
                });
            });
        }


        inp.onkeyup = () => {
            options.style.display = 'block'
            options.innerHTML = ''
            options.scrollTo(0, 0)

            const query = inp.value.toLowerCase().trim();

            if (query != null) {
                const filteredItems = data.filter(item => item.toLowerCase().startsWith(query));

                if (filteredItems.length) {
                    options.innerHTML = ''
                    filteredItems.map(item => {
                        const li = document.createElement('li');
                        li.textContent = item;
                        li.classList.add('text-[12px]')
                        options.appendChild(li);
                        li.addEventListener('click', () => {
                            span.textContent = item;
                            setArr(item)
                            contents.classList.remove('active')
                        });
                    });
                } else {
                    options.style.display = 'none'
                }
            } else {
                options.style.display = 'none';
            }
        }
    })

    return (
        <div className="w-full p-5 border rounded-xl">
            <span className="py  sidebar " >
                {name}
            </span>
            <div className="wrapper rounded-xl w-full bg-white relative flex flex-col">
                <div className="cont flex border rounded-md">
                    <div className={`${select}  w-full flex cursor-pointer h-[45px] px-5 rounded-sm  justify-cente items-center text-[16px] flex-grow`}>
                        <span>Any</span>
                    </div>
                    <div className="def w-16 flex justify-center items-center cursor-pointer">
                        <GrClose />
                    </div>
                </div>

                <div className={`${cont} rounded-lg py-5  hidden w-full h-fit top-[50px] bg border-black  left-0 z-50`}>
                    <div className="search relative">
                        <input className='inp text-[12px] rounded-lg h-[53px] w-full outline-none pl-4 pr-11 border' placeholder={`Enter any ${name}`} type="text" />
                    </div>
                    <ul className="options mt-3 p-0 overflow-y-auto max-h-[250px] text-[12px]">
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default FilterInput
