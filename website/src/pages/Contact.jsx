import { useContext, useEffect } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { useForm } from "react-hook-form"
import { SEND_MESSAGE } from "../../schema/queries"
import { useMutation } from "@apollo/client"
import errorHandler from "../middleware/errorHandler"

const Contact = ({ setConfirmTitle, setOnConfirm }) => {
    const { currentUser, isLoggedIn } = useContext(AuthContext)
    const { register, handleSubmit, setValue } = useForm()

    useEffect(() => {
        if (currentUser?.username) {
            setValue('email', currentUser.username)
        }
    }, [currentUser, setValue])

    const [sendMessage] = useMutation(SEND_MESSAGE, {
        onError: (error) => {
            errorHandler(setConfirmTitle, error)
        },
        onCompleted: () => {
            setConfirmTitle('MessageSent')
            setOnConfirm(() => () => {})
            if (!isLoggedIn) {
                setValue('email', '')
                setValue('message', '')
            } else {
                setValue('message', '')
            }
        }
    })

    const onSubmit = async (formData) => {
        sendMessage({ variables: formData })
    }

    return (
        <div className="container mt-4 contact">
            <div className="row glow" style={{minHeight: '100vh'}}>
                <div className="col-md-8">
                    <h1>Ota yhteyttä</h1>
                    <div className="contact-field mt-3">
                        <p>Etsin ensisijaisesti palkkatyötä ohjelmistokehittäjänä, mutta projektin luonteesta riippuen olen valmis harkitsemaan toiminimilaskuttamista. Ota yhteyttä ja kysy lisää, jos mielessäsi on vaikka esimerkiksi:</p>
                        <ul>
                            <li>Nettisivut</li>
                            <li>Peliprojektit</li>
                            <li>Tietokantaprojektit</li>
                            <li>Mobiilisovellukset</li>
                        </ul>
                        <p className="mt-4">Vastaan viestiisi mahdollisimman pian!</p>
                    </div>
                </div>

                <div className="col-md-4 mt-5">
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="mt-3 mb-5">
                        <div className="form-area">
                            <div className="mb-3">
                                <input
                                    id="email"
                                    {...register("email", { required: true })}
                                    className="form-control rounded"
                                    placeholder="Sähköposti tai puhelin:"
                                />
                            </div>

                            <div className="mb-2">
                                <textarea
                                    id="message"
                                    placeholder="Viesti"
                                    {...register("message")}
                                    className="form-control rounded"
                                    required
                                    rows={5}
                                />
                            </div>
                        </div>

                        <div className="text-center mb-3">
                            <button type="submit" className="btn btn-primary">Lähetä</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact
