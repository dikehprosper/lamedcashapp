/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "styled-components/native" {
    import * as styledComponents from "styled-components";

    export interface ReactNativeThemedStyledComponentsModule<T>
        extends styledComponents.ThemedStyledComponentsModule<T> {
        View: any;
        Text: any;
        <P>(
            component: React.ComponentType<P>,
        ): styledComponents.ThemedStyledFunction<P, T>;
    }

    declare const styled: ReactNativeThemedStyledComponentsModule<any>;

    export * from "styled-components";
    export default styled;
}
