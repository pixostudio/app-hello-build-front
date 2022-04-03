import React, { useEffect, useState } from "react";
import './styles.scss';
import { IMG_LOGO } from "../../config/constants";
import { Bounce } from "./styles";
import { LoadingOutlined } from '@ant-design/icons';

export function LoaderBigScreen(props: any): JSX.Element {

  const { loading } = props;
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (loading) {
      setLoader(loading);
    } else {
      setTimeout(() => {
        setLoader(loading);
      }, 1000);
    }
  }, [loading])

  return (
    <>
      {loader && (
        <div className={`loaderBigScreen ${!loading ?? 'ocultLoader'}`}>
          <Bounce>
            <img src={IMG_LOGO} className={`logoImg`} alt={'loader-miny'} />
          </Bounce>
        </div>
      )}
    </>
  )
}

export function LoadingContent(): JSX.Element {
  return (
    <LoadingOutlined style={{ fontSize: '16px' }} />
  )
}
