import React from 'react';
import DetailContent from './DetailContent';
import Fade from 'react-reveal';
    
// const IMG_API = "https://image.tmdb.org/t/p/w154";

const SearchMovie = () => {
    let resultImage=null;
    if (window.sessionStorage.getItem("movies") != null) {

        let result = JSON.parse(window.sessionStorage.getItem("movies"));
        console.log("데이터가 있는결과 : ", result);
        //If there is data for the entered keyword in SearchBar, a list is displayed. If not, it goes down to line 35 else.
        if (result[0].length > 0) {
            resultImage = result[0].map(item => {
                
                return (
                    <DetailContent id={item.id} movie={item} />
                    // item.poster_path == null ? <img alt={item.title} src={"https://i.ytimg.com/vi/GV3HUDMQ-F8/maxresdefault.jpg"} height="270" width="180" style={{margin: '5px'}} />
                    // : <img
                    // key={item.id}
                    // src={IMG_API + item.poster_path}
                    // //  height="200"
                    // width="180"
                    // alt={item.title}
                    // style={{margin: '5px'}}
                    // />
                );
            })
        }
        else {
                // No results found
            resultImage = 
            <img
                src ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQ0AAAC8CAMAAABVLQteAAAAllBMVEXw8PDMzMz19fXz8/MAAAD4+Pji4uLv7+/W1tbs7Ozp6en6+vrCwsP09PXNzc3r6+umpqfd3d11dHkAAA+SkpWgoKKampxfXmRTUlhYV123t7kAAA5paG19fIAAABWEg4cdGyiKio1IR04NDB2vrrC+vr93dntkY2k4Nz9KSVBAP0gfHSkDABgnJTEyMTqOjpAsKjQWFCI0XEOzAAASh0lEQVR4nO1dCXuqOBeGhLCFXVlE0Krg1v3//7nvnCQoWjtz753na2ds3md6KxBC8nJycrY6hqGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGh8SNAY9s36K819aHpHYM6aWQC0vhv+aCeaGp/xbC+A9SwXXNAlHp/1dQZmrq/Jkb/NVD/TIWaqH17xVywdodsUBrLFXIN94NeoIafXrS4NzZA7EdUuLZzISVpPG7qjVmL7o6NC7FHbUFvnHTElM/KQpy1Dffe2PAvZu2fp3YpBaBCrprCpkPvjI2rCV9NjPrXy+KsTYQE3RUbdLQz2M6tWVHjw0YzanpnbIzF/tNGzg29oi7dIRuuT/9mQoMKudArxl2yYf/FbOj5g5+6H7yXe2Tjk2uOb6ep7Z/UyQ0B+jFsnHWF+7lb9kPYiC82ksj/ZMI/gg1qX2+q6e0Z/wQ26OCURYBhudz2Ze+fjUEywFkDxTmY5zel4wew4UlhOJumUofcivjdPxvSWnfHZ8TKiW5M+v7ZiK/JGAi6sffcPRtSEK4jop8o0rtnw7gVzpIU3bj/3tnwbi6K+LYevXs2/FsLRS6VG2baj2DD+YWG4rRmY3z63tkQGiK+buj8UL3h3JQC+7Y2uXs2hB1+bXfSWyeNH8CG9NmuGPI/8dvung25VK5WRXR7ofwANgwZ3RilFJzoM5f+B7BhqICGDJDTIdzxYdc1fgYbnqQjSm3ft0+px+jW/T+ADSO+WckRfZSOH8GG4VzlXqNPpONnsAH77Dg3b1P/tnT8EDYMLNaQqVeRXPqEjp/DBuwmjuc5Q77Rv7VYfhAbV5B03AiY3j0bN3Mn/kez4wewQb3U/VgXqei4XCr3zsapkOeihkfBd13voqnQs/fKxlWR18dSsHMJx6j86S7ZoMaNauLPSqvV9mv+hhb+9+PMxlVx6PlzlF6rkKum9/MXGaru62PV36dlgJdXPimr/I9CsnFVIqwueR+nfV1u/fd/wvKfgmDjY4nwgPhySfh3ukIGUHOEG2J/q5JYNv3Fv/T6T+HMxi3zQja5UBSi6V0pixHoQMVfiv14E4nSD5mn+0H6q2IvVcjHauL7gv+rYk9/vamGhoaGhoaGhoaGhoaGhoaGhsZXgDJyPiAE/vsQvyIkHB8ydnl13MHpDnL++DEednULYR9afC0okzBo0E7F0BiDUXe537W9nLsTC3gGmba9yByJlDP1dzuZipQ/pGiSYW6E+n4IB6RrO3XOS/L09NCh2WpXE8xgCxj+sv3eTC2N1hViS0huHfHV0NnapcablS6tQkyE1NZms3lfFJwfrJwYni3h+5aFVcPqMGaNtVTvlnXHp6d1zQzWWpk8R23LqpVkpa6qNmYVPsN2Jag9t743i0/NxcPj4+NTyVgyWXM4Qx6siNL9mQ0aVLOyfHhfN83bIidAjkTrCTbYszwseDZRbACxk8N6YnWct/OtOEf58ul9LcsYgKJWNmSzeUFIIjt4p/bmm9kQyyDcTV7jOF9INjZzkwAb7sAGLiZuP70/Pz4+ABvUzLJttl0/LT1rjmxkZVnunicdz+aKDbpZJJznk7e6LhfIBmF+O384TiqXgfIgy0GI2GwCbHSTtxVg+i9gA0Dcp3k/37y/Ixs0tZ5yRvcw+UUxqIGQVouSE17NYaUITcNX86WUDQOP+LNlIhtSmGxr4xvUs94tWGPAhl80G+spsPfWvJq6lCznl2zM15yBuv1XsMHSl3lrHw97wQZvN+/PMdm/79+eFBuMBMfJg3lcH55BNgypebfzFciGrYQhmkw8ls1XXC6LxaLmvJs8K9kgR+t5aYNU5EfL8m+wcZQPsjdz17tVsv9lYHGxmc9gXcPogQ3eWQ/V4pAez3rDbveWdUzTl+PxUbABiiTjzbyIrc1rIb7Kh20XO8ayzdtR6ExSWE9l+WTlnC8nwIYXmb7hwZI0PDfwDLb6lI2Hx6fu4zb9ZfCyB9CH+AlU35qRDNSh/zw/jthw3q2qZozAgphtkA3Qo0fYXrrYgnvxj7aIu7B6Amy8gzbGW8L8zbJeEthTtrCn8OPj8+ODwOPzs5Wyz2Xj/XCov5ENllmZK1Ytr9cNI701ZcRuopfRnhLZfZcI5IUJkw9rWOjVo+lbT0kNBgLx908zAl3Nl4ZKRHPm2wzXndn1lDWwJ80E4PfaFrJBKSFA74gNSkBvpPxbFYfvR1OJogDjiaRCKfKkcOpVIEdG+UxtqgtLaFFkA3Qq2hsE9c7x6cGmgg1lb5AcrKqmidnqZYWc2AUsGi66dTlF2fBTN0ha/6RFCX735r9Ai8IKWai5ovVF07IBZFmTNYO1RKNAIFpPcuIH5nSx75OiNSe4p9Bk8/TuIitnNsCiWLmbjc/aOSoSGsCOgjCfLVALbLl430zwiVEpd9iHl7dn2IAUG7cs/K9jY7LGb92JXp/EDuui5YnG52ZeKDZY9rJ/AewfYIcFibCexFy6BbBBptZ8jSJyyQbM9v3B59XmgH2a8wdlYS2ADVKsD4dZs8x7Q8rG4uH9cb/etZINkhy/T5OSfF5xUJIcbFExGUdCaDg1ud3TXq77qgvJclXkSRe4g2Ve5crEHLMx2dYPD0Y/2UwC2GGBja4G9C8TnCioDFAaYIhx+Qx4GpxjTMkG2Cnftl5IsjgGfd8HSyEbJ3C0muVH1iy2plwsoEWJBKW+sEWNwUu9YGO+ch+ei80im7wnHrIh75ZsnDBiHKFk49F6/jbZCMGpkGI8OY4daulRyY+lNeBlRJgtZeN0w8hr22J372/Wki+tZ48Eg2qaWJdsnJ9hoA0rvDZqd9/nydIoTxQuRhpOt72aK6mTW0387XY8bNK91sOXiQaizwi92BoskvT0iPxi0yDFth4d+63okN4IhHwZKDnh4jxh4d80uY72nGchb6DYWpw83385UcIujtl3R3s0NDQ0NDQ0fgq+IBj42SPIZwenz1QGfcLbzUbF9eG1daVi7jJ3NL5Cz53T4Z+r/uivDe53cGEBegqjS3B+Kh8rmngyCCxMTpoPA08TsBhpFFAxL3DXiHAk1IEbDPa7XXddJ5x7MTtw3UU7L5VQ9xC8z5VGPziuvQtP64W9TkSWL6yl84MmuxwD3oQByORMVZz/AR0kXwkswVeg/R7DOM1uJTNo+RIQUOeAT7VXbQSn/QqTH0G7ncaUHkQXTl3nZV+npCsIDcApr2uTZzj6Hn10lwTK7yJFWUdR0DbEoPgVV6TzmWhnr2Rs7Q3HIDroSSAGQYOka1Zdkr6KhGbeND24/0uTons/40DTASTaF7EAHxxe9JgkHWKgvwtWuSIriM4W6TsuMq4qLVBFruva1Klg9P4+sitw1v0ZjCbPbK8/OqQ6sbHra5vXObLRv/cDGx34cG3BBjacPUex4cAw6TDC1diSDfU+2VGwEUAHPQteBRtuVOd5YPrTANvnnt8kBNggbrZt9+225RWwYYPL1x1Tykro5EU+DAf6B2yIrxcP6xtszGIqBLoyHPIaEBpXjMYzbpAjpwbPa8WGQXhQcW+12mFIlHCcs5wlISHP+xMbZJZgSinY+yAWNaM8k2zQ9GXZIlb4/kP+wkMaSjYMlmd9XZr8tYdmDTcoWxMGsmF4uDwcjyAbuKZ5CbIBbPBj+I/YMAY2aFC1W8QqlGyIS9TYb6d8Bg/lQAs+hCIbLOnYwIZfTafE9xOxVNkbx7hOKn1P6AScdy46JKRbNmWbxyHIxrLu6hmyAc91Mw6vgSv/lGMHVLFBD5zxtOXTMrPdFuPJR8kGMctsl4akIoMsQEOUDZVr8Ev++4qDVY5IEwrZYET62SFRRFEntl2j4oTNMIG427ZZCSulWMaOefSUbHjd2uX5rGe1YMOzfAzmNBmqOmpmjJrHLEHt0AeBmWcYT3ZJ9xr0QWmz9lCZJK0ygUbQH1vemQ2SZF1XRvw14DQ8uox3LRF6I1073IbVeliuMCfBXuu2aY4jNt6b5W/TwZpd08yapqoJKdoTcFhsi2HxtqMVSIKQjTVnDgog6bJmaVMq2bATA16LkfIINR17Xa04yIb4phHqHaFZMI2xv1QGPuGni84rJeXU81R5Bo3hKWyKHZzY4M6yi317ivtVOmt2mYFaNAzzHhTJNGCVjTsRiSrMbe1ObNA/kg3MGPtbLnYuO7XVVpc66hLoEGIAG6ToWGiDXMjlSDhHfT6slHRWlrvdbgbqnKQHPjOZ0hvxOsAFqHJQXKVlYDsa6w3abYeXAEckXfMyYERp0bbJyqxddVOxp3DPY4IN6CDnlG9dGAO+AneP+U2pN2BkjHh/pDfwifZQTuIGZCiiQYQ55s0MB1eJs65NrGHBhwBnrhl0hTkbemBytcEO677ZoXOspXYM9qZIyg51DaqopUxRb/R9UEktCncxIoPkFDugxjoZZIM58qYAZwv7rYiVtSgoVR69ZkxoUSc/yGQvsvFeLJfbsvD+gA3xLLfx8Reo0umlZSeyiIbIFVIvF+llYIP2r9Np3vWup2TDSEtYVNl2BrqnwmySN8UdFnSGL22GIZPfLgX20CYVq8ZTe0p2GrlXCXUzNQYtar4KcToEIdoSKguO5iGtc0GKA2+tUBmKEnNfbmrHhPyJbPjZdgv/wU82DWlfjHdYYCOSx8oWFTfgniI0LR30BhihLZevVsU4QR+LWSqRG9jge5mJMUIVFsVcpGCj5aq07NTBIBsqfsqnyAatxwMUoWIhG0PlHbJhKMn+o5VC2ACxw0rdvlX2QbKTqn6wrPEhh/ND6Fp6NtTdgzG7Wi5Xp3asOUe+QYsq2XhWdu85yS7b2Qe1p4y+2aVfXTgdK6E3hgGerW6yHnlXrDofjAf6h7j+LpmPLZxxfH/4hiq1tu3RZMZ/E+7bpw+qOu58Tba78SD/MmOi7vnY8OL/sTA6cL4ke33Dl/wnXfxj0M8OvrsgSkNDQ0PjMyh7R1RlXCfIx8f0V10lMvok7SUZG/wknkl/vef/IwjWPYKzL0ok3U5CfVG9NBOVOxMaqQ1mqoueBD0ZdIby/diQW3diz0NP1ZbutoORVlZjB7R3MDboodXFhgfIMcCnzjM7FRkdbOWvZydM0PRrDRHfMFJZvZOoMvl6CYZlHhKsDGR5WSwrn5pgd9JoK01GZMZvJNYi9EwDrKDbONTeYR9+w4x4x/OeUnDH4ae0PTjFGvGXGaIzGZhmjR+IQtSkxLgtypHdfjkdbJcqfwh/2aIWzq0lG8K0TGeMvAbgeu54yKOM4wTA2x7lEqRk8EYapyg2fM+ZL9iIkY2GJz0xm+wZLO5GsWGLeyLBRgxNWSbYYLschSM4Ihvll5dywFs6s0GKLEnyPEnMQZBDZmeSjWjFaeiXAxuj16aSA7OTqc6SvMl2jai1fGaGd8wwCkK4D37fTrKRSQdpJvoByggXbICzK8qoWA6ezreywTAC2EknVOZbvL5OirIjyIZByteoP0bkAxvxUVXeKoeK8v7AaChWCs+yjsc7A1dKemzXNd/5VMqG8ImlbID/1XVVjGy4io2kI/Q72Tg0pUFMGZ9YvopxeEUdpMfYkGzwqKsNzoTe6HLOUP2KuTR8rEWZ3QipQDbIasXLwseVErIZLI41zcpdplYKUSslNC3fjMpYrpQEw8kRZgm875UN6g5xwlT6ioTwVxgiZhfs12lRLLNyiROgptKcuG/ElRmYWDxpy/5KF2MhDNgg3ZRTltigRWtKS26Qqdso2cjadtW2OwyMsKZbcblS8GDdNLM3IXrNN7BhY92s0BthXpwgxZ7nOCJkwzFNe2ZTDq8zvNxhnbrrmrbrEkkr4YVYOK9daIQYMWI0YraNAXrGD4bUG7AP+3FlxCJoXLe8DAY2yDTgjFa4Xpzs6/eUBna0smyEFmWuil/KMBj1GjEgsVIo5TvD3jUVvE6KuecwDGWyFiQoqTkbSvvYUYSiXZTzMGmEtnwBveEep1XHJRsif1tyEaHtDpR6R1eyQfk0IMSpONprZvgXA///AKwl8ZqRDdpd/GWIf+yFThNs4GbsULHUad+dEOOm7K6mLvyS4RtWiVkaYoeVkTde9Ein66s9xRH7+AHvcUOZiZA7rN0HWREE/d7sXfo14ZybENYXkWw4Q2mDet0DG6WDKg/YUCXWCCcqctiT4SdXIeeBjZEOJCI9IDIBM8EG3iNvykOVokXri6WFPAv/BKz7vlJzwQYNGmlkXiaxFBskd5T5CJMNEaIk47oqlsnQZvM6clSmQ0kyNT00yD5W0lLTCYCZ8YVvlA0pDiEmm84x9Ytr6KmMDj7H2Ie57MAQ8nG7gxsXdKhPQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0Pj/4r/AaMvU50fLUrPAAAAAElFTkSuQmCC"
                alt=""
                width="100%"
                height="500px"
                style={{alignItems: 'center'}}
            />
        }
    } 
    return (
        <Fade bottom>
            <div className="container-fluid" style={{backgroundColor: '#181818'}}>
                <div className="container">
                    <h3 style={{color: 'white', fontWeight: 'bold', marginBottom: 20}}>검색 목록</h3>
                    <div className="row">
                            {resultImage}
                    </div>
                </div>
            </div>
        </Fade>
    )
}

export default SearchMovie;
