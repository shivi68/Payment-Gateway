class lenskart{
    public:
    string glasses;
    string frame;
     public :
     void rimless(){
        cout<<"Rimless<<endl<<;
     }
     };
     class prakhar:public lenskart{
        void choice(int n){
            if(n==1)
            rimless();
        }
     };
     int main(){
        prakhar p1;
        p1.choice(1);
     }
