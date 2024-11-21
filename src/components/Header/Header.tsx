import Image from 'next/image';

import nebulaLogoBlack from '../../assets/nebulaLogoBlack.png';
import chevronBlack from '../../assets/chevronBlack.svg';
import nebulaLogoWhite from '../../assets/nebulaLogoWhite.png';
import chevronWhite from '../../assets/chevronWhite.svg';
import { HeaderProps } from '@/components/Header/types';

const Header = ({ isInformScreen, history, handleBackPage }: HeaderProps) => {
  return (
    <div className="mb-[20px]">
      <header className="flex items-center my-[10px] relative">
        <div className="ml-[15px] lg:ml-[156px] absolute left-0 w-[24px] h-[24px] flex items-center justify-center">
          {history.length > 0 && (
            <button
              onClick={handleBackPage}
              className="w-full h-full flex items-center justify-center"
            >
              <Image
                src={isInformScreen ? chevronWhite : chevronBlack}
                alt="Back"
                width={8}
                height={15}
              />
            </button>
          )}
        </div>

        <div className="mx-auto w-[24px] h-[24px] flex items-center justify-center">
          <div className="w-[15px] h-[16px] relative">
            <Image
              src={isInformScreen ? nebulaLogoWhite : nebulaLogoBlack}
              alt="Logo"
              layout="fill"
              objectFit="cover"
              objectPosition="left"
            />
          </div>
        </div>

        <div className="absolute right-0 w-[24px] h-[24px]"></div>
      </header>
    </div>
  );
};

export default Header;
