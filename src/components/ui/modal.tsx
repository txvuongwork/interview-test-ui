import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { type FunctionComponent, type PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./button";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string | React.ReactNode;
  closeOnOverlayClick?: boolean;
  className?: string;
  contentClassName?: string;
};

export const Modal: FunctionComponent<PropsWithChildren<ModalProps>> = ({
  isOpen,
  onClose,
  title,
  closeOnOverlayClick = true,
  className = "",
  children,
  contentClassName = "",
}) => {
  const handleOverlayClick = () => {
    if (closeOnOverlayClick) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={handleOverlayClick}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={handleOverlayClick}
          >
            <div
              className={cn(
                "bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-auto p-4 space-y-3",
                className
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-base font-semibold text-gray-900 text-center">
                {title}
              </h3>

              <div className={cn("text-center w-full", contentClassName)}>
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

type ErrorModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  closeOnOverlayClick?: boolean;
  contentClassName?: string;
};

export const ErrorModal: FunctionComponent<
  PropsWithChildren<ErrorModalProps>
> = ({
  isOpen,
  onClose,
  children,
  title,
  closeOnOverlayClick,
  contentClassName,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        title || (
          <div className="flex items-center justify-center w-full">
            <img
              src="/images/error-i-illustration.png"
              alt="error"
              className="w-10 h-10"
            />
          </div>
        )
      }
      closeOnOverlayClick={closeOnOverlayClick}
      contentClassName={cn(
        "flex flex-col items-center gap-4",
        contentClassName
      )}
    >
      {children}

      <Button
        variant="destructive"
        className="w-full max-w-2/3"
        onClick={onClose}
      >
        {t("button.ok")}
      </Button>
    </Modal>
  );
};
